"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(timestamp, data) {
        this.index = ++Block.index;
        this.timestamp = timestamp;
        this.data = JSON.stringify(data);
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return crypto_1.default.createHmac('sha256', this.index + this.data + this.previousHash + this.nonce).digest('hex');
    }
}
Block.index = 0;
class BlockChain {
    constructor() {
        this.chain = [this.createGenesis()];
    }
    createGenesis() {
        return new Block(new Date, "Genesis Block");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash != currentBlock.calculateHash())
                return false;
            if (currentBlock.previousHash != previousBlock.hash)
                return false;
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
