

interface CommandItem {
    command: string;
    key: string
}

export type Commands = CommandItem[];

export interface PRes {
    status: string,
    value: string
}