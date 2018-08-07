ethsigverify: ethsigverify.cpp
	eosiocpp -o ../ethereum.signature.verify/ethsigverify.wast ethsigverify.cpp
	eosiocpp -g ../ethereum.signature.verify/ethsigverify.abi ethsigverify.cpp

test:
	init_chain.sh

clean:
	rm *.wasm *.wast
