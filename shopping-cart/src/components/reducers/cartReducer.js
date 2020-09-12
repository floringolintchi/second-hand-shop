import Item1 from '../../images/dell-optiplex-390-sff.jpg'
import Item2 from '../../images/dell-optiplex-3010.jpg'
import Item3 from '../../images/dell-optiplex-3020.jpg'
import Item4 from '../../images/hp-compaq-6300-pro-sff.jpg'
import Item5 from '../../images/hp-prodesk-400.jpg'
import Item6 from '../../images/hp-z420.jpg'
import Item7 from '../../images/dell-latitude-e6420-i5-2520m.jpg'
import Item8 from '../../images/hp-elitebook-folio-9480m-i5-4310u-8gb-ram.jpg'
import Item9 from '../../images/t440p.jpg'
import Item10 from '../../images/laptop-lenovo-thinkpad-t510-i5-520m.jpg'
import Item11 from '../../images/laptop-hp-zbook-15-g4-i7-7820hq-32gb.jpg'
import Item12 from '../../images/laptopuri-dell-latitude-e5410-i5-450m.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Dell Optiplex', desc: "Dell Optiplex i5 4gb RAM", price:300,img: Item1},
        {id:2,title:'Dell Optiplex', desc: "Dell Optiplex i3 8gb RAM", price:300,img: Item2},
        {id:3,title:'Dell Optiplex', desc: "Dell Optiplex i7 16gb RAM",price:800,img: Item3},
        {id:4,title:'HP Compaq', desc: "HP Compaq i3 4gb RAM", price:260,img: Item4},
        {id:5,title:'HP Prodesk', desc: "HP Prodesk i5 8gb RAM", price:400,img: Item5},
        {id:6,title:'HP z420', desc: "HP Xeon 16gb RAM",price:600,img: Item6},
        {id:7,title:'Dell Latitude', desc: "e6420 i5 2520m",price:549,img: Item7},
        {id:8,title:'HP Elitebook Folio', desc: "i5 4310u 8gb ram",price:620,img: Item8},
        {id:9,title:'Thinkpad T440p', desc: "i5 4200m 8gb RAM SSD",price:789,img: Item9},
        {id:10,title:'Thinkpad T510', desc: "i5 520m 4gb ram",price:450,img: Item10},
        {id:11,title:'HP Zbook', desc: "i7 7820hq 32gb ram",price:1500,img: Item11},
        {id:12,title:'Dell Latitude', desc: "i5 450m 4gb ram",price:320,img: Item12}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
