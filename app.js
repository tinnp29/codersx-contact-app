
// Application
var fs = require('fs');
var readlineSync = require('readline-sync');
var chalk = require('chalk');

var db = 'contact.json';
var contactsJson = fs.readFileSync(db, { encoding: 'utf8' } );
var contactsObj = JSON.parse(contactsJson);

var title = 'Hoa Mặt Trời';

// menu
function menu() {
  console.log(chalk.bgCyan('Welcome to Contact Application By ' + title + '\n'));

  console.log('\t' + chalk.blueBright('1. Xem Danh Bạ'));
  console.log('\t' + chalk.green('2. Thêm Liên Hệ'));
  console.log('\t' + chalk.yellow('3. Sửa Liên Hệ'));
  console.log('\t' + chalk.red('4. Xóa Liên Hệ'));
  console.log('\t' + chalk.magentaBright('5. Tìm Kiếm Liên Hệ'));
  console.log('\t' + chalk.grey('7. Hướng Dẫn'));
  console.log('\t' + chalk.whiteBright('8. Thoát Ứng Dụng' + '\n'));

  var option = readlineSync.question('\t' + '>');

  switch(option) {
    case '1':
      showContact();
      break;
    case '2':
      addContact();
      break;
    case '3':
      updateContact();
      break;
    case '4':
      removeContact();
      break;
    case '5':
      searchContact();
      break;
    case '7':
      console.log('Dễ mà :v');
      break;
    case '8':
        quit();
        break;
    default:
      console.log('\n \t' + chalk.hex('#fc2605').bold('Ops!, có vẻ bạn nhập không chính xác, thử lại nhé bạn yêu. \n'));
      menu();
      break;
  }

}

// show Contact
function showContact() {
  console .log('\n');
  console.log(chalk.bgBlueBright('-------------- Danh Sách Liên Hệ ----------------' + '\n'));

  for (var i = 0; i < contactsObj.length; i++) {
    console.log('\t' + (i + 1) + '. ' + chalk.hsl(32, 100, 50).bold(contactsObj[i].name) + 
                ' | ' + chalk.hex('#a80788').bold(contactsObj[i].phoneNumber) + '\n');
  }
  menu();
}

/* 
    - add Contact
    -> 1. create a new object and entered data
    -> 2. push to contactsObj
    -> 3. convert obj to json and save to contact.json
*/
function addContact() {
  console.log('\n');
  console.log(chalk.bgGreen('-------------- Thêm Mới Liên Hệ ----------------'));
  console.log('\n');

  var newName = readlineSync.question('Nhập Tên Liên Hệ: ');
  var newPhoneNumber = readlineSync.question('Nhập Số Điện Thoại: ');
  
  // 1
  var contactObj = {};
  contactObj.name = newName;
  contactObj.phoneNumber = newPhoneNumber;

  contactsObj.push(contactObj); // 2

  fs.writeFileSync(db, JSON.stringify(contactsObj)); // 3

  console.log('\n');
  showContact();
}

/* 
    - update Contact
    -> 1. Choose a contact to update, use for loop to compare elements in contactsObj with option user entered
    -> 2. create a new contact
    -> 3. use splice method to replace contact selected = new contact
    -> 4. save to contact.json 
*/
function updateContact() {
  console.log('\n');
  console.log(chalk.bgYellow('------------Cập Nhật Liên Hệ: ---------------'));
  console.log('\n');

  var optionContact = readlineSync.question('Chọn số thứ tự liên hệ để cập nhật nào bạn ơi > ');

  for (var i = 0; i < contactsObj.length; i++) {
    if(parseInt(optionContact) === i + 1) {  // 1
      var newName = readlineSync.question('Nhập tên mới đi bạn: > ');
      var newPhone = readlineSync.question('Giờ là số điện thoại: > ');

      // 2
      var newContact = {};
      newContact.name = newName;
      newContact.phoneNumber = newPhone;

      var removedContact = contactsObj.splice(i, 1, newContact); // 3
      
      writeFileSync(db, JSON.stringify(contactsObj)); // 4

    } else {
      console.log('\n \t' + chalk.hex('#fc2605').bold('Ops!, có vẻ bạn nhập không chính xác, thử lại nhé bạn yêu. \n'));
      menu();
    }
  }

  console.log('\n');
  showContact();
}

/*
    - remove Contact
    -> 1. use for loop to get contact selected 
    -> 2. use splice to delete contact
    -> 3. don't forget save into contact.json :v
*/ 
function removeContact() {
  console.log('\n');
  console.log(chalk.bgRed('------------Xóa Liên Hệ: ---------------'));
  console.log('\n');

  var optionContact = readlineSync.question('Chọn số thứ tự liên hệ để xóa > ');
  // 
  for(var i = 0; i < contactsObj.length; i++) { // 1
    if(parseInt(optionContact) === i + 1) {
      contactsObj.splice(i, 1); // 2
      fs.writeFileSync(db, JSON.stringify(contactsObj)); // 3
    } else {
      console.log('\n \t' + chalk.hex('#fc2605').bold('Ops!, có vẻ bạn nhập không chính xác, thử lại nhé bạn yêu. \n'));
      menu();
    }
  }

  console.log('\n');
  showContact();
}

/*
    - search Contact
    -> 1. use filter() method to interact contactsObj, create an array contains contacts that equals key user entered from data.
    -> 2. check contact is exits in new array ?, if true -> print to screen new array, else return zero
*/ 
function searchContact() {
  console.log(chalk.bgMagentaBright('------------Tìm Kiếm Liên Hệ: --------------'));
  console.log('\n');

  var searchByName = readlineSync.question('Nhập tên liên hệ để tìm kiếm: > ');

  // 1
  var searchedContacts = contactsObj.filter(function(contact) {
    return contact.name.toLowerCase().indexOf(searchByName.toLowerCase()) > -1;
  });

  // 2
  if(searchedContacts.length > 0) {
    console.log('\n \t' + chalk.hex('#42a626').bold('Tìm thấy ' + searchedContacts.length + ' kết quả: \n'));
    for(var contact in searchedContacts) {
      console.log('\t' + chalk.hsl(32, 100, 50).bold(searchedContacts[contact].name) + 
      ' | ' + chalk.hex('#a80788').bold(searchedContacts[contact].phoneNumber) + '\n');
    }
  } else {
    console.log('\n \t' + chalk.hex('#fc2605').bold('Không tìm thấy kết quả ! \n'));
  }

  menu();
}

// quit
function quit() {
  console.log(chalk.bgCyan('Thank you for use my first App :v !!!'));
}

// run
menu();

// NOTE: so sánh 2 object trong JS luôn trả về false