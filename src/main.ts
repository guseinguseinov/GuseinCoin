import crypto from 'crypto';

class Block {
    private static index: number = 0;
    public timestamp: Date;
    public data: any;
    public previousHash: string;
    public hash: string;
    public nonce: number;

    index;

    constructor(timestamp: Date, data: any) {
        this.index = ++Block.index;
        this.timestamp = timestamp;
        this.data = JSON.stringify(data);
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return crypto.createHmac('sha256', this.index + this.data + this.previousHash + this.nonce).digest('hex');
    }
}

class BlockChain {
    public chain: Block[];

    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(new Date, "Genesis Block");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) return false;

            if (currentBlock.previousHash != previousBlock.hash) return false;
        }
        return true;
    }
}

let guseinComp = new BlockChain();

guseinComp.addBlock(new Block(new Date, { amount: 4 }));
guseinComp.addBlock(new Block(new Date, { amount: 10 }));
guseinComp.addBlock(new Block(new Date, { amount: 23 }));
guseinComp.addBlock(new Block(new Date, { amount: 34 }));

console.log(guseinComp.isValid()); // true

guseinComp.chain[2].data = { amount: 1000 };

console.log(guseinComp.isValid()); // false

console.log(guseinComp);