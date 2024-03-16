var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title:  {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true}, //
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
  }
);

//Export model
module.exports = mongoose.model('Book', BookSchema);


function get_books () {
  return BookSchema.find({}, 'title author')
  .sor({title: 1})
  .populate('author');
}

exports.show_books = async () => {
  try  {
    let books = await get_books().exec();
    return BookSchema.map(function(b) {
      return b._id + ' : ' + navigator.title + ' : ' + author(b.author).name;
    });
  } catch(err) {
    console.log('Could not get books ' + err);
  }
}