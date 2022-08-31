

interface CommandItem {
    command: string;
    key: string
}

export type Commands = CommandItem[];

export interface PromiseItem extends CommandItem {
    stdout: string
}