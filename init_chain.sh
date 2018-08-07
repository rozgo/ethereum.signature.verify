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
cleos set contract dealer jankenpon -p dealer

# Create players accounts
echo "\nCreating players accounts"
cleos create account eosio player.jose ${EOS_KEY} ${EOS_KEY}
cleos create account eosio player.rosa ${EOS_KEY} ${EOS_KEY}

# cleos push action dealer create '["player.rosa", "player.jose"]' -p player.jose
cleos push action dealer create '["player.jose", "player.rosa"]' -p player.rosa

# P11=$(openssl rand 32 -hex)
# echo -n '15fe76d25e124b08feb835f12e00a879bd15666a33786e64b655891fba7d6c12' | xxd -r -p | sha2 -256 -q

# Play

PLAYER_ROSA_SECRET_ROUND_1=$(openssl rand 32 -hex)
PLAYER_ROSA_CHOOSE_ROUND_1=03
PLAYER_ROSA_COMMIT_ROUND_1=$(echo -n "$PLAYER_ROSA_SECRET_ROUND_1""$PLAYER_ROSA_CHOOSE_ROUND_1" | xxd -r -p | sha2 -256 -q)
echo "PLAYER_ROSA_SECRET_ROUND_1: $PLAYER_ROSA_SECRET_ROUND_1"
echo "PLAYER_ROSA_CHOOSE_ROUND_1: $PLAYER_ROSA_CHOOSE_ROUND_1"
echo "PLAYER_ROSA_COMMIT_ROUND_1: $PLAYER_ROSA_COMMIT_ROUND_1"
cleos push action dealer commit "[\"player.jose\", \"player.rosa\", \"player.rosa\", 1, \"$PLAYER_ROSA_COMMIT_ROUND_1\"]" -p player.rosa

PLAYER_JOSE_SECRET_ROUND_1=$(openssl rand 32 -hex)
PLAYER_JOSE_CHOOSE_ROUND_1=02
PLAYER_JOSE_COMMIT_ROUND_1=$(echo -n "$PLAYER_JOSE_SECRET_ROUND_1""$PLAYER_JOSE_CHOOSE_ROUND_1" | xxd -r -p | sha2 -256 -q)
echo "PLAYER_JOSE_SECRET_ROUND_1: $PLAYER_JOSE_SECRET_ROUND_1"
echo "PLAYER_JOSE_CHOOSE_ROUND_1: $PLAYER_JOSE_CHOOSE_ROUND_1"
echo "PLAYER_JOSE_COMMIT_ROUND_1: $PLAYER_JOSE_COMMIT_ROUND_1"
cleos push action dealer commit "[\"player.jose\", \"player.rosa\", \"player.jose\", 1, \"$PLAYER_JOSE_COMMIT_ROUND_1\"]" -p player.jose

# echo "player.rosa reveal"
# cleos push action dealer reveal "[\"player.jose\", \"player.rosa\", \"player.rosa\", 1, \"$PLAYER_ROSA_SECRET_ROUND_1\", \"$PLAYER_ROSA_CHOOSE_ROUND_1\"]" -p player.rosa
# echo "player.jose reveal"
# cleos push action dealer reveal "[\"player.jose\", \"player.rosa\", \"player.jose\", 1, \"$PLAYER_JOSE_SECRET_ROUND_1\", \"$PLAYER_JOSE_CHOOSE_ROUND_1\"]" -p player.jose
