export interface INode {
    key: string | null;
    value: string | null;
    prev: INode | null;
    next: INode | null;
    expireTime: number;
}
export declare class LRUCache {
    max: number;
    ttl: number;
    cache: Map<string, any>;
    head: INode;
    tail: INode;
    constructor({ max, ttl }: {
        max: number;
        ttl: number;
    });
    get(key: string): any;
    set(key: string, value: any): void;
    private moveToHead;
    private removeNode;
    private addToHead;
    private popTail;
}
