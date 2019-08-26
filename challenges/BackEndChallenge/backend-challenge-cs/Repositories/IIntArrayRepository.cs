using System.Collections.Generic;

namespace BackendChallengeWebApi.Repositories
{
    public interface IIntArrayRepository
    {
        void SetIntArray(List<int> intArray); 
        List<int> GetIntArraySorted(); 
    }
}