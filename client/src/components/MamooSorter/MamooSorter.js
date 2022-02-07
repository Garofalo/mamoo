





export const sortMamoos = function(arr, type){


    if(type === "Most Distant"){
       
        let output =    [...arr].reverse();   
        return output
        
        
    }
    else if(type === "Most Recent"){
        
        return arr;

    } else if( type === "Good Times"){
        const res = arr.filter(x =>  x.type === "Good Times")

        return res
    } else if( type === "Tough Times"){
        const res = arr.filter(x =>  x.type === "Tough Times")

        return res
    } else if( type === "Milestones"){
        const res = arr.filter(x =>  x.type === "Milestone")

        return res
    } else if( type === "Reminders"){
        const res = arr.filter(x =>  x.type === "Reminder")

        return res
    }
}   