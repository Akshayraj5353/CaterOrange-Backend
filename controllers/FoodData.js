const foodData =async (req,res)=>{
    try{
        res.send([global.food_items,global.food_category])
    } catch (error) {
        console.log(error);
        res.send("server error")
    }
}

module.exports = foodData;