/**
 * Created by baoxuebin on 2017/3/31.
 */
class Utils {

    static indexOf(arr, obj) {
        for (let index in arr) {
            if (obj == arr[index])
                return index;
        }

        return -1;
    }

    static contain(arr, obj) {
        if (this.indexOf(arr, obj) >= 0) {
            return true;
        }

        return false;
    }

    static addObjToArray(arr, obj) {
        if (this.indexOf(arr, obj) >= 0)
            return null;

        arr.push(obj);
        return obj;
    }

    static delObjFromArray(arr, obj) {
        let index = this.indexOf(arr, obj);
        if (index >= 0) {
            arr.splice(index, index + 1);
            return obj;
        }

        return null;
    }

}