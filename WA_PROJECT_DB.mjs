"use strict"

import sqlite from 'sqlite3';
import dayjs from 'dayjs';

const db = new sqlite.Database('database.sqlite', (err) => { if (err) throw err });


function Bag(bagid, size, type, price, establishment, status = 'Available', content = []) {
    this.bagid = bagid;
    this.size = size;
    this.type = type;
    this.price = price;
    this.establishment = establishment;
    this.status = status;
    this.day = dayjs().format("DD/MM/YYYY HH:mm:ss");
    this.status = "Available";
    //The content if regular takes the inpunt content else empty
    this.content = type == "Regular" ? content : [];

}


//data of resturant/store with the list of bags
function Establishment(rsid, name, address, phone, category) {
    this.rsid = rsid;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.category = category;
    this.bags = [];

    //add a bag of the resturant
    this.add = (bag) => new Promise((resolve, reject) => {
        let array = [];
        let sql = 'INSERT INTO bags (size, type, price, establishment_id, date) VALUES (?,?,?,?,?) returning bagid';

        db.get(sql, [bag.size, bag.type, bag.price, this.rsid, bag.day, ...array], (err, row) => {
            if (err)
                reject(err);
            else {

                sql = 'INSERT INTO bag_content(bag_id, item_name, quantity) VALUES';
                for (const con of bag.content) {
                    sql += ' (?,?,?),';
                    array.push(row['bagid'], con.name, con.quantity);
                }
                //removing the last comma ","
                sql = sql.slice(0, -1);

                db.run(sql, [...array], (err) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(row);
                    }

                })

            }


        })
    })

    //remove a bag from the resturant based on ID
    this.remove = (id) => new Promise((resolve, reject) => {
        const sql = 'DELETE FROM bags WHERE bagid = ?'
        db.run(sql, [id], (err) => {
            if (err)
                reject(err);
            else
                resolve("deleted");
        })
    })

    //Add an element to a BAG
    this.addElement = (bagid, element, quantity) => new Promise((resolve, reject) => {
        const sql = 'INSERT INTO bag_content(bag_id, item_name, quantity) VALUES (?,?,?)'
        db.run(sql, [bagid, element, quantity], (err) => {
            if (err)
                reject(err);
            else
                resolve("Added")
        })
    })

    //Remove an element from a BAG
    this.removeElement = (id) => new Promise((resolve, reject) => {
        const sql = 'DELETE FROM bag_content WHERE id = ?'
        db.run(sql, [id], (err) => {
            if (err)
                reject(err);
            else
                resolve("Removed")
        })
    })

    //Update the quantity of an element inside a BAG
    this.modifyQ = (id, newQ) => new Promise((resolve, reject) => {
        const sql = 'UPDATE bag_content SET quantity = ? WHERE id = ?';
        db.run(sql, [newQ, id], (err) => {
            if (err)
                reject(err);
            else
                resolve("Done");
        })

    })

}


//List of the resturant/store
function ListOfEstablishments() {
    this.rs = [];


    // Sorting method by alphabetical order
    this.sortByName = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM establishments Order by name ASC';

            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const result = rows.map((row) => new Establishment(row.rsid, row.name, row.address, row.phone, row.category));
                    resolve(result);
                }
            })
        })
    }

    //filter for all the needed parameters
    this.findBy = (arrayParams) => new Promise((resolve, reject) => {
        let sql = `SELECT * 
       FROM establishments as e, bags as b, bag_content as bc
       WHERE 1=1 AND e.rsid = b.establishment_id 
       AND bc.bag_id = b.bagid`

        let params = [];

        if (arrayParams.name) {
            sql += " AND name = ? ";
            params.push(arrayParams.name);
        }
        if (arrayParams.price) {
            sql += " AND price <= ? ";
            params.push(arrayParams.price);
        }
        if (arrayParams.type) {
            sql += " AND type = ? ";
            params.push(arrayParams.type);
        }
        if (arrayParams.size) {
            sql += " AND size = ? ";
            params.push(arrayParams.size);
        }

        if (arrayParams.content) {

            let placeholders = arrayParams.content.map(() => '?').join(', ');
            sql += ` AND item_name IN (${placeholders})
                    GROUP BY bagid
                    HAVING count(*)>= ? `;
            params.push(...arrayParams.content, arrayParams.content.length);
        }

        //Rivedere content
        db.all(sql, params, (err, rows) => {
            if (err)
                reject(err);
            else {
                //TODO how to manipulate the results
                const result = rows.map((row) => console.log(row));
                resolve(result);
            }
        })

    })
}

