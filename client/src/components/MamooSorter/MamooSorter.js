





export const sortMamoos = function(arr, type){


    if(type === "Most Recent"){
       
    let sortRecent = function (prop, arr) {
        prop = prop.split('.')
        let len = prop.length;
        
        arr.sort(function (a, b) {
            var i = 0;
            while( i < len ) {
                a = a[prop[i]];
                b = b[prop[i]];
                i++;
            }
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return arr;
    };
       
        return sortRecent("pk", arr)
    }
    else if(type === "Most Distant"){
        console.log("most distant")
        let sort = function (prop, arr) {
            prop = prop.split('.')
            let len = prop.length;
            
            arr.sort(function (a, b) {
                var i = 0;
                while( i < len ) {
                    a = a[prop[i]];
                    b = b[prop[i]];
                    i++;
                }
                if (a < b) {
                    return 1;
                } else if (a > b) {
                    return -1;
                } else {
                    return 0;
                }
            });
            return arr;
        };
        return sort("pk", arr)
    } else if( type === "Good Times"){
        const res = arr.filter(x =>  x.type === "Good Times")
        console.log(res)
        return res
    } else if( type === "Tough Times"){
        const res = arr.filter(x =>  x.type === "Tough Times")
        console.log(res)
        return res
    } else if( type === "Milestones"){
        const res = arr.filter(x =>  x.type === "Milestone")
        console.log(res)
        return res
    } else if( type === "Reminders"){
        const res = arr.filter(x =>  x.type === "Reminder")
        console.log(res)
        return res
    }
}   