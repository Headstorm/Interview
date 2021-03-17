/***********************************************************************************************************************************************************
* "Run-Length encoding" Data Compression program
* 
* Description:
* Passes a list of characters and a list of structs to a function and compresses the list of characters
* by storing consecutive repitions of the same character in a struct that has an integer member that
* keeps track of how many consecutive repetitions occured and a character member that stores the character itself.
* 
* The list of compressed data is then printed via a function call from main
* 
* P.S. Sorry if I went overboard with the comments, I just wanted to be as clear as possible :^)
* 
* Written by Ahmed Iqbal
***********************************************************************************************************************************************************/

#include <iostream>
#include <string>
#include <list>

using namespace std;

// struct that holds compressed data has a char variable to hold the character,
// and an integer variable to to indicate how many times it occurs consecutively.
struct Data
{
   int count;
   char letter;
};

list<Data> encode(list<char>, list<Data>);
void printCompData(list<Data>);

int main()
{
   // creating the list of characters to be compressed and the list of Datas it is to be compressed into
   list<char> charList = { 't','t','t','t','b','c','c','a','a','d','r','r','r','r' };
   list<Data> dataComp = { {1,'a'} };

   // calling function, passing in both lists, and storing compressed data in a list of Data
   dataComp = encode(charList, dataComp);

   // calling function to print the compressed list and passing it said list
   printCompData(dataComp);

   return 0;
}

/***********************************************************************************************************************************************************
* Description: Is passed a list of structs to a function and compresses the list of characters
* by storing consecutive repitions of the same character in a struct that has an integer member that
* keeps track of how many repetitions occured of which character.
* 
* Input: a list of characters, a list of Datas
* Output: a list of Datas
***********************************************************************************************************************************************************/
list<Data> encode(list<char> charList, list<Data> dataComp)
{
   // creating iterators to access elements of the lists
   list<char>::iterator iChar = charList.begin();
   list<Data>::iterator iData = dataComp.begin();

   // looping from the start of charcter list to the 2nd to last element, as we are comparing each element
   // to the next one(there is nothing to compare the last element to)
   for (list<char>::iterator i = charList.begin(); i != --charList.end(); i++)
   {
      // comparing each element to the next one; if they are the same, storing second element in the character member of Data,
      // and incrementing the counter member of dataComp every time two elements are convecutive and the the same
      if (*iChar == *(++iChar))
      {
         iData->count++;
         iData->letter = *iChar;
      }
      // if the 2 elements dont match, creating new Data at the end of the list of Data, setting its counter member to 1,
      // and storing 2nd element in its character member. Incrementing iData to point to newly created Data
      else
      {
         dataComp.push_back({ 1, *iChar });
         iData++;
      }
   }

   // returning list of compressed data
   return dataComp;
}

/***********************************************************************************************************************************************************
* Description: Is passed a list of Datas, creates an iterator to traverse the list, and prints the list
* Input: a list of Datas
***********************************************************************************************************************************************************/
void printCompData(list<Data> dataComp)
{
   // creating iterator to output compressed data
   list<Data>::iterator iData = dataComp.begin();

   // printing compressed data(to see that that it works). a string is used to space the the elements properly
   string spacing = "List(";
   for (iData = dataComp.begin(); iData != dataComp.end(); iData++)
   {
      cout << spacing << "(" << iData->count << "," << iData->letter << ")";;
      spacing = ", ";
   }
   cout << ")" << endl;
}