const { isRef } = require("joi")

const Bookstore = artifacts.require('BookStore')

contract('BookStore', (accounts) => {
    describe('Publishing', async () => {
        it("gives the author the specified amount of book version copies", async () => {
            const book_store = await Bookstore.new()
           
            //const book_id = 1
            const price = web3.utils.toWei('50', 'ether'); //NOTE: Decimal incorrect for USDC
            const currency = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' //=>e.g USDC, ETH, ...
            const quantity = 100

            const author = accounts[5];

            await book_store.puslish(quantity, price, currency, {from: author })

            let author_balance = await book_store.balanceOf(author, 1)
            author_balance = parseInt(author_balance)

            assert.equal(author_balance, 50);
        })

        it("increases the book ID", async () => {
            const book_store = await Bookstore.new()

            const author = accounts[3]

            const price = web3.utils.toWei('50', 'ether'); //NOTE: Decimal incorrect for USDC
            const currency = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' //=>e.g USDC, ETH, ...
            
            await book_store.puslish(75, price, currency, {from: author})
            await book_store.puslish(50, price, currency, {from: author})
            
            let author_balance = await book_store.balanceOf(author, 2)
            author_balance = parseInt(author_balance)

            assert.equal(author_balance, 50);
        })
        
        it.only("correctly sets the price and currency for a book version", async () => {
            const book_store = await Bookstore.new()
           
            //const book_id = 1
            let price = web3.utils.toWei('50', 'ether'); //NOTE: Decimal incorrect for USDC
            const currency = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' //=>e.g USDC, ETH, ...
            const quantity = 100

            const author = accounts[5];

            await book_store.puslish(quantity, price, currency, {from: author })

            let book_version_price = await book_store.bookVersionPrice(1)
            book_version_price = web3.utils.fromWei(book_version_price, 'ether')
            assert.equal(book_version_price, '50');


            price = web3.utils.toWei('100', 'ether'); //NOTE: Decimal incorrect for USDC

            await book_store.puslish(quantity, price, currency, {from: author })

            book_version_price = await book_store.bookVersionPrice(2)
            book_version_price = web3.utils.fromWei(book_version_price, 'ether')
            assert.equal(book_version_price, '100');
            

        })
    })
})