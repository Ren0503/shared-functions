"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
class LRUCache {
    constructor({ max, ttl }) {
        this.max = max;
        this.ttl = ttl;
        this.cache = new Map();
        this.head = { key: null, value: null, prev: null, next: null, expireTime: Date.now() + ttl };
        this.tail = { key: null, value: null, prev: this.head, next: null, expireTime: Date.now() + ttl };
        this.head.next = this.tail;
    }
    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            if (node.expireTime && node.expireTime < Date.now()) {
                this.removeNode(node);
                this.cache.delete(key);
                return -1; // Return -1 if key has expired
            }
            this.moveToHead(node);
            return node.value;
        }
        return -1; // Return -1 if key is not found
    }
    set(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            node.expireTime = Date.now() + this.ttl;
            this.moveToHead(node);
        }
        else {
            const newNode = {
                key, value,
                prev: null, next: null,
                expireTime: Date.now() + this.ttl
            };
            this.cache.set(key, newNode);
            if (newNode) {
                this.addToHead(newNode);
            }
            if (this.cache.size > this.max) {
                const tailNode = this.popTail();
                if (tailNode && tailNode.key) {
                    this.cache.delete(tailNode.key);
                }
            }
        }
    }
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    removeNode(node) {
        var _a, _b;
        if ((_a = node.prev) === null || _a === void 0 ? void 0 : _a.next) {
            node.prev.next = node.next;
        }
        if ((_b = node.next) === null || _b === void 0 ? void 0 : _b.prev) {
            node.next.prev = node.prev;
        }
    }
    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        if (this.head.next) {
            this.head.next.prev = node;
        }
        this.head.next = node;
    }
    popTail() {
        const tailNode = this.tail.prev;
        if (tailNode) {
            this.removeNode(tailNode);
        }
        return tailNode;
    }
}
exports.LRUCache = LRUCache;
