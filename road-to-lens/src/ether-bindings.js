import { ethers } from "ethers";

export function bindings() {
    return {
        getProvider: async ({ chainId }) => {
            const network = ethers.providers.getNetwork(chainId);
            return new ethers.providers.Web3Provider(window.ethereum, network);
        },
        getSigner: async ({ chainId }) => {
            const provider = await bindings().getProvider({ chainId });
            return provider.getSigner();
        },
    };
}
