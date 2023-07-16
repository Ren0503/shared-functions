export interface INode {
  key: string | null
  value: string | null
  prev: INode | null
  next: INode | null
  expireTime: number
}

export class LRUCache {
  max: number
  ttl: number
  cache: Map<string, any>
  head: INode
  tail: INode

  constructor({ max, ttl }: { max: number; ttl: number }) {
    this.max = max
    this.ttl = ttl
    this.cache = new Map()
    this.head = { key: null, value: null, prev: null, next: null, expireTime: Date.now() + ttl }
    this.tail = { key: null, value: null, prev: this.head, next: null, expireTime: Date.now() + ttl }
    this.head.next = this.tail
  }

  get(key: string) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)
      if (node.expireTime && node.expireTime < Date.now()) {
        this.removeNode(node)
        this.cache.delete(key)
        return -1 // Return -1 if key has expired
      }
      this.moveToHead(node)
      return node.value
    }
    return -1 // Return -1 if key is not found
  }

  set(key: string, value: any) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)
      node.value = value
      node.expireTime = Date.now() + this.ttl
      this.moveToHead(node)
    } else {
      const newNode = {
        key, value,
        prev: null, next: null,
        expireTime: Date.now() + this.ttl
      }
      this.cache.set(key, newNode)
      if (newNode) {
        this.addToHead(newNode)
      }
      if (this.cache.size > this.max) {
        const tailNode = this.popTail()
        if (tailNode && tailNode.key) {
          this.cache.delete(tailNode.key)
        }
      }
    }
  }

  private moveToHead(node: INode) {
    this.removeNode(node)
    this.addToHead(node)
  }

  private removeNode(node: INode) {
    if (node.prev?.next) {
      node.prev.next = node.next
    }
    if (node.next?.prev) {
      node.next.prev = node.prev
    }
  }

  private addToHead(node: INode) {
    node.prev = this.head
    node.next = this.head.next
    if (this.head.next) {
      this.head.next.prev = node
    }
    this.head.next = node
  }

  private popTail() {
    const tailNode = this.tail.prev
    if (tailNode) {
      this.removeNode(tailNode)
    }
    return tailNode
  }
}