import { stringHelper } from ".";

export const dateTimeHelper = {
    monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    formatDate: function(str?: string){
        if(!str) return undefined;
        let date = new Date(str);
        return `${dateTimeHelper.monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },
};