const db = require('../database/index');
const fs = require('fs');
const path = require('path');


const updateWithInventory = () => {
  var output = [];
  var sql = 'select product_id, SUM(quantity) as total_quantity from purchases where date=CURDATE() group by product_id;';

  db.sequelize.query(sql)
  .then((data) => {
    // console.log('inventory data: ', data);
    //console.log('inventory data: ', data[0]);
    //console.log('inventory data: ', data[0][0].product_id);
    return output.concat(data[0]);
  })
  .then((output) => {
    console.log(output);
    return fs.writeFile(path.join(__dirname + '/../Utils/dailyInventoryUpdate.json'), JSON.stringify(output), function() {
      console.log('inventory data generated successfully!');
    })
  })
  .catch((err) => console.log(err)); 
}

module.exports = updateWithInventory;
