let BookInstance = require('../models/bookinstance');

BookInstance.find({'status': {$eq: 'Available'}})
.populate('book')
.exec()
.then(list_bookinstances => {
  res.send(list_bookinstances.map(function(bookInstance) {
    return bookInstance.book.title + " : " + bookInstance.status
  }));
})

exports.show_all_books_status = function(res) {
  return res.send([]);
}