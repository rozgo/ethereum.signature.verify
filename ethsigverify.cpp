#include <eosiolib/eosio.hpp>
#include <eosiolib/crypto.h>

#include "secp256k1.hpp"

using namespace eosio;

class ethsigverify : public eosio::contract
{
  private:
    static bool is_equal(const checksum256 &a, const checksum256 &b)
    {
        return memcmp((void *)&a, (const void *)&b, sizeof(checksum256)) == 0;
    }

    static bool is_zero(const checksum256 &a)
    {
        const uint64_t *p64 = reinterpret_cast<const uint64_t *>(&a);
        return p64[0] == 0 && p64[1] == 0 && p64[2] == 0 && p64[3] == 0;
    }

  public:
    using contract::contract;

    //@abi recover
    void recover(const checksum256 &digest, const std::string &sig)
    {
        secp256k1_context_t ctx;
        secp256k1_ecmult_context_init(&ctx.ecmult_ctx);
        secp256k1_ecmult_context_build(&ctx.ecmult_ctx);
    }
};

EOSIO_ABI(ethsigverify, (recover))
