import { makeContract, SwapAndBridge } from "./useContract";
import useWallet from "./useWallet";
import { ContractAddress } from "@/constants";
import { ethers, ContractTransaction } from "ethers";

import SWAP_AND_BRIDGE_ABI from "@/abi/swapAndBridge.abi.json";

export default function useSwapAndBrdige() {
  const { provider, account, chainId } = useWallet();

  async function swapAndBridge(
    amountIn: string,
    dstChainId: number
  ): Promise<ContractTransaction | undefined> {
    if (provider && account && chainId) {
      const swapAndBridge = makeContract<SwapAndBridge>(
        ContractAddress[chainId].swapAndBridge,
        SWAP_AND_BRIDGE_ABI,
        provider,
        account
      );

      return swapAndBridge.swapAndBridge(
        ethers.utils.parseEther(amountIn),
        0,
        dstChainId,
        account,
        account,
        ethers.constants.AddressZero,
        "0x",
        {
          value: ethers.utils.parseEther(amountIn.toString()).mul(2).toString(),
        }
      );
    }
  }

  return {
    swapAndBridge,
  };
}