// 1. The Global Types Core
/*
Conceptual Reason: 
This central repository defines the authoritative data schemas used across the 
entire application ecosystem. 
It ensures type safety, enables TypeScript's structural typing system, and 
maintains consistent payload structures for inter-component communication and server 
messages.
*/

export interface Task {
    id: string;
    text: string;
}

export interface ActionResponse {
    error?: string;
    success?: boolean;
}
