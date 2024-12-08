export interface MeetingWithTimeDescriptionDto { 
    id: string, 
    date: string,
    status: string | null, 
    timeDescription: {
        time: string, 
        description: string
    }[]
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
