"""
Coderpad solution
"""
def pend(arr):
    ##  arr = [2,3,5,1,4]
    ##  vrr = [0,0,0,0,0]
    var = [0] * len(arr)
    mid = (len(var) - 1) / 2
    ##  sort_arr = [1,2,3,4,5]
    ##  vrr = [0,0,1,0,0]
    sort_arr = sorted(arr)
    var[mid] = sort_arr[0]
    #                                            ^
    # focus shouldn't be at beginning ofr array [1',2,3,4,5]
    #                       ^
    # it should be mid [1,2,3,4,5]
    #                       ^
    #         var      [0,0,1,0,0]
    # Now it can be flipped left and right for ever increment
    #                     ^   ^
    #         sort_arr [1,2,3,4,5]
    #                     ^   ^
    #         var      [0,0,1,0,0]
    arr_increment = 1
    for i in range(1, mid + 1):
        #By now the mid is the only position that is correct
        #As we parse through var[], we also parse through arr[] and flip values from least to greatest
        #                     ^
        #         sort_arr [1,2,3,4,5]
        #                         ^
        #         var      [0,0,1,0,0]
        var[mid+i] = sort_arr[arr_increment]
        arr_increment += 1
        #                       ^
        #         sort_arr [1,2,3,4,5]
        #                     ^
        #         var      [0,0,1,0,0]
        var[mid-i] = sort_arr[arr_increment]
        arr_increment += 1
    #Odd number of elements
    if ((len(sort_arr)-1) % 2 == 1):
        #                             ^
        #         sort_arr [1,2,3,4,5,6]
        #                             ^
        #         var      [0,0,1,0,0,0]
        var[len(arr) - 1] = sort_arr[len(arr) - 1]

    print var

if __name__ == "__main__":
    arr = [5,1,3,6,2,4]
    pend(arr)
    arr = [5, 1, 3, 2, 4]
    pend(arr)
    arr = [10, 4, 1, 5, 4, 3, 7, 9]
    pend(arr)

