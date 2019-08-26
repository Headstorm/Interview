using System.Collections.Generic;

namespace BackendChallengeWebApi.Repositories
{
    public class IntArrayRepository : IIntArrayRepository
    {
        private List<int> intArray = new List<int>();

        public void SetIntArray(List<int> intArray) 
        {
            this.intArray = intArray;
        }

        public List<int> GetIntArraySorted() 
        {
            var intArray = new List<int>(this.intArray);
            intArray.Sort();
            return intArray;
        }
    }
}