def merge_sort(arr):
    arr = arr[:]
    snapshots = []

    def merge(left, right):
        result = []
        while left and right:
            if left[0] <= right[0]:
                result.append(left.pop(0))
            else:
                result.append(right.pop(0))
            snapshots.append(result + left + right)
        result.extend(left or right)
        snapshots.append(result)
        return result

    def merge_sort_recursive(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort_recursive(arr[:mid])
        right = merge_sort_recursive(arr[mid:])
        return merge(left, right)

    merge_sort_recursive(arr)
    return snapshots
