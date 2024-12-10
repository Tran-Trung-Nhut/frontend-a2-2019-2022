import { timeDescriptionWithoutId } from "./timeDescription.dto";

export interface MeetingWithTimeDescriptionDto { 
    id: string, 
    date: string,
    status: string | null, 
    timeDescription: {
        time: string, 
        description: string
    }[]
}

export interface meetingWithTimeDescription {
    id: string;
    date: Date;
    status: string;
    timeDescription: timeDescriptionWithoutId[];
}
  

export const defaultMeetingWithTimeDescription: MeetingWithTimeDescriptionDto = { 
    id: '', 
    date: '',
    status: 'No', 
    timeDescription: [
        {
            time: '', 
            description: ''
        }
    ]
}
