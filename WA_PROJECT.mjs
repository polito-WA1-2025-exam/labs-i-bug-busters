"use strict";


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
    this.remove = function remove(item){
           
     this.bags.forEach(bag =>{ 
        const index = bag.content.findIndex(cont => cont.name == item);
        bag.content.splice(index,1)
                                        })
 
     }
 
     this.addElement = function addElement(element, quantity){
         this.bags.forEach(bag =>bag.content.push({"name" : element, "quantity":quantity }));
     }
 
     this.modifyQ = function modifyQ(item, newQ){
        
     this.bags.forEach(bag =>{ 
        const index = bag.content.findIndex(cont => cont.name == item);
        bag.content[index].quantity = newQ;
                                        })
 
     }
    
}

function List_res_sto(){
    this.rs = [];

    this.add = (e_rs) => this.rs.push(e_rs);

      // Sorting method 
      this.sortByName = function() {
        this.rs.sort((a, b) => a.name.localeCompare(b.name));
    };

    this.find = (p) => this.rs.flatMap(store => store.bags).filter((bag) => bag.price < p);

}

const list_of_rs = new List_res_sto();

// examples resturant
const store1 = new Res_sto("Supermarket A", "Via Roma 10", "123456789", "Grocery");
const store2 = new Res_sto("Supermarket B", "Corso Milano 20", "456123789", "Grocery");
const restaurant1 = new Res_sto("Restaurant X", "Piazza Duomo 5", "987654321", "Italian");

// Aggiunta di bag
store1.add(new Bag("Large", "Surprise", 2.5, store1.name));
store2.add(new Bag("Medium", "Regular", 1.5, store2.name, [
    { name: "Apple", quantity: 2 },
    { name: "Banana", quantity: 1 },
    { name: "Orange", quantity: 3 }
]));
restaurant1.add(new Bag("Small", "Regular", 1.0, restaurant1.name, [{name:"pizza", quantity:2}]));


list_of_rs.add(store1);
list_of_rs.add(store2);
list_of_rs.add(restaurant1);

//list_of_rs.sort()

// print the list of the resturnat/store ordered alphabetically
const list=list_of_rs.rs;

store2.addElement("Cetriolo",6)
//list.forEach(i => {console.log(i)})
store2.modifyQ('Apple',9)
store2.remove('Cetriolo')
list.forEach(i => i.bags.forEach(j=> console.log(j)) )

//console.log(list_of_rs.find(1.2).flatMap(a => a.content));
