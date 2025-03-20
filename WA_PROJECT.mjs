"use strict";

import dayjs from 'dayjs';

function Bag(bagid, size, type, price, establishment, content=[]){
    this.bagid = bagid;
    this.size = size;
    this.type = type;
    this.price = price;
    this.establishment = establishment;
    this.status = "Available"
    //The content if regular takes the inpunt content else empty
    this.content = type == "Regular" ? content : []

   


}

// Constructor
function Res_sto(rsid,name, address, phone, category) {
    this.rsid = rsid;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.category = category;
    this.bags = [];

    this.add = (bag) => this.bags.push(bag);

    //feature to remove a bag from a list; an update is needed to use the id
    this.remove = function remove(item, bid){
        //return the bag with a specified ID
       let rBag = this.bags.find((bag) => bag.bagid == bid);
       //search for the item id
       const index = rBag.content.findIndex((bagItem) => bagItem == item);
       //remove the item using the id
       rBag.content.splice(index, 1);
     }
 
     this.addElement = function addElement(bid, element, quantity){
        //search for the bagid and add the new element
         this.bags.find((bag) => bag.bagid == bid).content.push({"name" : element, "quantity":quantity });
     }
 
     this.modifyQ = function modifyQ(bid, item, newQ){
        let rBag = this.bags.find((bag) => bag.bagid == bid);
        //search for the item id
        const index = rBag.content.findIndex((bagItem) => bagItem.name == item);
        //update the quantity of the item
        rBag.content[index].quantity = newQ;
    
     }
    
}

function List_res_sto(){
    this.rs = [];

    this.add = (e_rs) => this.rs.push(e_rs);

      // Sorting method by alphabetical order
      this.sortByName = function() {
        this.rs.sort((a, b) => a.name.localeCompare(b.name));
    };

  
    //filter by  resturant/store by the name
    this.findName = (name) => this.rs.find((p) => p.name == name);
    //filter by the bag  price range
    this.findByPriceRange = (userPrice) => this.rs.flatMap((res) => res.bags).filter((bag)=> bag.price <= userPrice );
    //filter by the bags size
    this.findBySize = (userSize) => this.rs.flatMap((res) => res.bags).filter((bag)=> bag.size == userSize );
    //filter by the bags type
    this.findByType = (userType) => this.rs.flatMap((res) => res.bags).filter((bag)=> bag.type == userType );
    //filter by the content of the bag, parameter reset
    this.findByContet = (...userContent) =>  this.rs.flatMap((res) => res.bags).find((bag) => userContent.every(element => bag.content.map((x)=>x.name).includes(element)));

}

