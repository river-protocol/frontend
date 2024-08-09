import type { NextApiRequest, NextApiResponse } from "next";
import { Turnkey, TurnkeyApiTypes } from "@turnkey/sdk-server";
import { refineNonNull } from "@/utils";
import { TWalletDetails } from "@/types";

// Default path for the first Ethereum address in a new HD wallet.
// See https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki, paths are in the form:
//     m / purpose' / coin_type' / account' / change / address_index
// - Purpose is a constant set to 44' following the BIP43 recommendation.
// - Coin type is set to 60 (ETH) -- see https://github.com/satoshilabs/slips/blob/master/slip-0044.md
// - Account, Change, and Address Index are set to 0
import { DEFAULT_ETHEREUM_ACCOUNTS } from "@turnkey/sdk-server";
import { NextResponse } from "next/server";

type TAttestation = TurnkeyApiTypes["v1Attestation"];

type CreateSubOrgWithPrivateKeyRequest = {
  subOrgName: string;
  challenge: string;
  privateKeyName: string;
  attestation: TAttestation;
};

type ErrorMessage = {
  message: string;
};

async function createUser(
  req: Request
) {
  const createSubOrgRequest = (await req.json()) as CreateSubOrgWithPrivateKeyRequest;
  try {
    const turnkey = new Turnkey({
      apiBaseUrl: process.env.NEXT_PUBLIC_TURNKEY_API_BASE_URL!,
      apiPrivateKey: process.env.TURNKEY_API_PRIVATE_KEY!,
      apiPublicKey: process.env.TURNKEY_API_PUBLIC_KEY!,
      defaultOrganizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    });

    const apiClient = turnkey.apiClient();

    const walletName = `Default ETH Wallet`;

    const createSubOrgResponse = await apiClient.createSubOrganization({
      subOrganizationName: createSubOrgRequest.subOrgName,
      rootQuorumThreshold: 1,
      rootUsers: [
        {
          userName: "New user",
          apiKeys: [],
          authenticators: [
            {
              authenticatorName: "Passkey",
              challenge: createSubOrgRequest.challenge,
              attestation: createSubOrgRequest.attestation,
            },
          ],
          oauthProviders: []
        },
      ],
      wallet: {
        walletName: walletName,
        accounts: DEFAULT_ETHEREUM_ACCOUNTS,
      },
    });

    const subOrgId = refineNonNull(createSubOrgResponse.subOrganizationId);
    const wallet = refineNonNull(createSubOrgResponse.wallet);

    const walletId = wallet.walletId;
    const walletAddress = wallet.addresses[0];

    return Response.json({
      id: walletId,
      address: walletAddress,
      subOrgId: subOrgId,
    });
  } catch (e) {
    console.error(e);

    return Response.json({
      message: "Something went wrong.",
    });
  }
}

export async function POST(request: Request) {
    // Do whatever you want
    return await createUser(request);
}