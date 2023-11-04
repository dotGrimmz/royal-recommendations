export const decodeMultipleChoiceId = (num) => {
  /* 
ill need to take a 6 digit int 
convert it to a string
then split with  commas by pairs
this will give the corresponding key that needs to be queried for 
multiple choice based responses like genre
*/

  const idString = String(num);

  const pairs = idString.match(/.{1,2}/g);

  const result = pairs.map((pair) => parseInt(pair, 10));

  return result;
};
//decodeMultipleChoiceIds(123456) will output [12, 34, 56].
