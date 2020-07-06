export class Validation {
   checkEmptyString(text) {
      return text === '';
   }

   checkLength(text, minLength) {
      return text.length >= minLength;
   }

   checkDate(date, limitDate) {
      return date > limitDate;
   };

}