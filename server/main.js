import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  // Students collection
  Students = new orion.collection('students', {
    singularName: 'student', // The name of one of these items
    pluralName: 'students', // The name of more than one of these items
    title: 'students', // The title in the index of the collection
    link: {
      /**
       * The text that you want to show in the sidebar.
       * The default value is the name of the collection, so
       * in this case it is not necessary.
       */
      title: 'Students'
    },
    /**
     * Tabular settings for this collection
     */
    tabular: {
      columns: [
        { data: "title", title: "Title" },
        /**
         * If you want to show a custom orion attribute in
         * the index table you must call this function
         * orion.attributeColumn(attributeType, key, label, options)
         */
        orion.attributeColumn('file', 'image', 'Image'),
        orion.attributeColumn('summernote', 'body', 'Content', { orderable: true }), // makes it searchable
        orion.attributeColumn('createdBy', 'createdBy', 'Created By')
      ]
    }
  });

  // Students Schema
  /**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Students.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  status: {
    type: Boolean,
    label: "On Intervention List"
  },
  class: {
    type: String
  },
  grade: {
    type: Number,
    min: 6,
    max: 12
  },
  attendance: {
    type: Number,
    label: "Days Absent"
  },


  /**
   * The file attribute is a custom orion attribute
   * This is where orion does its magic. Just set
   * the attribute type and it will automatically
   * create the form for the file.
   * WARNING: the url of the image will not be saved in
   * .image, it will be saved in .image.url.
   */
  image: orion.attribute('file', {
      label: 'Image',
      optional: true
  }),
  /**
   * Here it's the same with an image attribute.
   * summernote is an html editor.
   */
  body: orion.attribute('summernote', {
      label: 'Body'
  }),
  /**
   * This attribute sets the user id to that of the user that created
   * this post automatically.
   */
  createdBy: orion.attribute('createdBy')
}));


});
