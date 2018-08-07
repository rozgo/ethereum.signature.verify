cleos wallet unlock -n debug --password PW5JGqrHwsAphXLGcZ4rHAJqQxmGQXdL42puB5Vjo14odGspwYFvo

# setup params
EOS_BUILD_PATH=$HOME/eos/build
EOS_KEY=EOS8k4wDWyrq9yPUL17YKqThf5F5VVMs5c8diRZQfGKG9698dd6na

# initial chain contracts
echo "\nBooting Chain Contracts"
cleos set contract eosio ${EOS_BUILD_PATH}/contracts/eosio.bios -p eosio

# dealer account
echo "\nCreating dealer account"
cleos create account eosio dealer ${EOS_KEY} ${EOS_KEY}
cleos set contract dealer ethsigverify -p dealer

cleos push action dealer recover '["f994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15", "388862e1a8e03c0d5012ca201c65c0eaecbe13f7418444e8788cd2f358bf254214d413e7e033d08629cd3a50ed413e947d289e2bedf34a133048b39fa509d7cc1c"]' -p dealer

