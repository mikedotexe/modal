/* eslint-disable */
// "use client"

import { Button, Card, Loading, Spacer } from '@nextui-org/react';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { UniversalProvider } from '@walletconnect/universal-provider';
import { IUniversalProvider } from '@walletconnect/universal-provider';
import type { EthereumProvider as IEthereumProvider } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { DEMO_SIGN_REQUEST } from 'laboratory/src/data/Constants';
import { useEffect, useState } from 'react';
import { NotificationCtrl } from '../../controllers/NotificationCtrl';
import { getErrorMessage, showErrorToast } from '../../utilities/ErrorUtil';
import { SignClient } from '@walletconnect/sign-client';
import { SessionTypes } from '@walletconnect/types';
import * as process from 'process'

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "see readme and set project id env var"

export default function WithEthereumProvider() {
  console.log('aloha');
  const [providerClient, setProviderClient] = useState<IUniversalProvider | undefined>(undefined);
  const [session, setSession] = useState<boolean>(false);
  const [disconnecting, setDisconnecting] = useState<boolean>(false);

  async function onConnect() {
    console.log('aloha onConnect. providerClient', providerClient);

    if (!providerClient) {
      showErrorToast('providerClient is not initialized');
      return;
    }

    // try {
    //   await providerClient.connect();
    //   setSession(true);
    //   NotificationCtrl.open('Connect', JSON.stringify(providerClient.session, null, 2));
    // } catch (error) {
    //   console.log('aloha error', error);
    //   const message = getErrorMessage(error);
    //   showErrorToast(message);
    // }

    console.log('aloha after onConnect');
  }

  useEffect(() => {
    if (!providerClient) return

    const startConnect = async () => {
      console.log('aloha before')
      const heheh = await providerClient.connect({
        namespaces: {
          "near": {
            methods: [
              "near_signIn",
              "near_signOut",
              "near_getAccounts",
              "near_signTransaction",
              "near_signTransactions",
            ],
            chains: ["near:mainnet"],
            events: ["chainChanged", "accountsChanged"],
            rpcMap: {
              'near:mainnet': 'https://rpc.mainnet.near.org',
            },
          }
        }
      })
      console.log('aloha after. heheh', heheh)
      console.log('aloha after. providerClient', providerClient)
    }

    startConnect().then(() => {})
  }, [providerClient])

  // Define other methods (onDisconnect, onSignMessage) here, similar to onConnect

  useEffect(() => {
    async function start() {
      try {
        // Initialize the WalletConnect Client
        const client = await SignClient.init({
          logger: 'debug',

          projectId: PROJECT_ID,
          relayUrl: "wss://relay.walletconnect.com",
          metadata: {
            name: "NEAR Unstaking",
            description: "Unstaking NEAR",
            url: "https://stake.mikedotexe.com/",
            icons: [],
          },
        });

        // Initialize the Universal Provider with the WalletConnect Client
        // const universalProvider = new UniversalProvider(client, {
        //   chains: ['near:mainnet'],
        //   methods: ['near_sendTransaction', 'near_getAccountBalance'],
        //   events: ['chainChanged', 'accountsChanged'],
        // });
        const universalProvider = await UniversalProvider.init({
          logger: 'debug',
          projectId: PROJECT_ID,
          relayUrl: "wss://relay.walletconnect.com",
          metadata: {
            name: "NEAR Unstaking",
            description: "Unstaking NEAR",
            url: "https://stake.mikedotexe.com/",
            icons: [],
          },
          client
        });

        setProviderClient(universalProvider);
        console.log('aloha i set the provider client');
      } catch (error) {
        console.error('Error initializing provider client:', error);
        showErrorToast('Failed to initialize provider client');
      }
    }

    start().then(()=> {})
  }, []);

  return (
    <>
      {providerClient && (
        <Card css={{ maxWidth: '400px', margin: '100px auto' }} variant="bordered">
          <Card.Body css={{ justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            {session ? (
              <>
                {/*<Button shadow color="primary" onPress={onSignMessage}>*/}
                {/*  Sign Message*/}
                {/*</Button>*/}
                {/*<Spacer />*/}
                {/*<Button shadow color="error" onPress={onDisconnect} disabled={disconnecting}>*/}
                {/*  {disconnecting ? <Loading size="xs" color={'white'} /> : 'Disconnect'}*/}
                {/*</Button>*/}
              <Button shadow color="primary" onPress={onConnect}>
                Connect sheesh
              </Button>
              </>
            ) : (
              <Button shadow color="primary" onPress={onConnect}>
                Connect
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}


// /* eslint-disable */
// // "use client"
//
// import { Button, Card, Loading, Spacer } from '@nextui-org/react'
// import { EthereumProvider } from '@walletconnect/ethereum-provider'
// import { IUniversalProvider, UniversalProvider } from '@walletconnect/universal-provider'
// // import NearProvider from '@walletconnect/universal-provider'
// // import NearProvider from '@walletconnect/universal-provider/src/providers/near';
// import type { EthereumProvider as IEthereumProvider } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
// import { DEMO_SIGN_REQUEST } from 'laboratory/src/data/Constants'
// import { useEffect, useState } from 'react'
// import { NotificationCtrl } from '../../controllers/NotificationCtrl'
// import { getProjectId, getTheme } from '../../utilities/EnvUtil'
// import Client from '@walletconnect/sign-client';
// import { SessionTypes } from '@walletconnect/types';
// import { getErrorMessage, showErrorToast } from '../../utilities/ErrorUtil'
//
// const initOptions = {
//   namespace: {
//     chains: ['near:mainnet'], // Specify the chains this provider will support
//     methods: ['near_sendTransaction', 'near_getAccountBalance'], // Specify the methods this provider will support
//     events: ['chainChanged', 'accountsChanged'], // Specify the events this provider can emit
//     accounts: [], // Initial accounts, likely empty before connection
//     rpcMap: {
//       'near:mainnet': 'https://rpc.mainnet.near.org', // RPC URL for the NEAR mainnet
//     },
//   },
// };
//
//
//
// export default function WithEthereumProvider() {
//   console.log('aloha')
//   const [providerClient, setProviderClient] = useState<IUniversalProvider | undefined>(undefined)
//   const [session, setSession] = useState<boolean>(false)
//   const [disconnecting, setDisconnecting] = useState<boolean>(false)
//
//
//   async function onInitializeProviderClient() {
//     const client = new UniversalProvider({
//       // Configuration options here
// projectId: PROJECT_ID,
//       metadata: {
//         name: "NEAR Unstaking",
//         description: "Unstaking NEAR",
//         url: "https://stake.mikedotexe.com/",
//         icons: [],
//       },
//     });
//
//     client.namespaces = {
//         near: {
//           // Specify the methods, chains, and other configurations specific to NEAR
//           methods: ["near_sendTransaction", "near_getAccountBalance"],
//           chains: ["near:mainnet"],
//           rpcMap: {
//             "near:mainnet": "https://rpc.mainnet.near.org",
//           },
//         },
//     }
//     // const client = await NearProvider.init({
//     //   logger: "debug",
// projectId: PROJECT_ID,
//     //   metadata: {
//     //     name: "NEAR Unstaking",
//     //     description: "Unstaking NEAR",
//     //     url: "https://stake.mikedotexe.com/",
//     //     icons: [],
//     //   },
//     // })
//
//     if (client.session) {
//       setSession(true)
//     }
//     client.setDefaultChain(`near:mainnet`, "https://rpc.mainnet.near.org");
//     console.log('aloha client.namespaces', client.namespaces)
//
//     setProviderClient(client)
//     console.log('aloha i set the provider client')
//   }
//
//   async function onConnect() {
//     console.log('aloha onConnect. providerClient', providerClient)
//
//     if (providerClient) {
//       try {
//         await providerClient.connect()
//         // await providerClient.connect({
//         //     namespaces: {
//         //       near: {
//         //         methods: [
//         //           "near_signIn",
//         //           "near_signOut",
//         //           "near_getAccounts",
//         //           "near_signTransaction",
//         //           "near_signTransactions",
//         //         ],
//         //         chains: ["near:mainnet"],
//         //         events: ["chainChanged", "accountsChanged"],
//         //         // rpcMap: {
//         //         //   80001: `https://rpc.walletconnect.com?chainId=near:mainnet&projectId=${PROJECT_ID}`,
//         //         // },
//         //       },
//         //     },
//         //   }
//         // )
//         setSession(true)
//         NotificationCtrl.open('Connect', JSON.stringify(providerClient.session, null, 2))
//       } catch (error) {
//         console.log('aloha error', error)
//         const message = getErrorMessage(error)
//         showErrorToast(message)
//       }
//     } else {
//       showErrorToast('providerClient is not initialized')
//     }
//
//
//     console.log('aloha after onConnect')
//   }
//
//   // Subscribe for pairing URI
//   providerClient?.on("display_uri", (uri) => {
//     console.log(uri);
//   });
//
//   // Subscribe to session ping
//   providerClient?.on("session_ping", ({ id, topic }) => {
//     console.log(id, topic);
//   });
//
//   // Subscribe to session event
//   providerClient?.on("session_event", ({ event, chainId }) => {
//     console.log(event, chainId);
//   });
//
//   // Subscribe to session update
//   providerClient?.on("session_update", ({ topic, params }) => {
//     console.log(topic, params);
//   });
//
//   // Subscribe to session delete
//   providerClient?.on("session_delete", ({ id, topic }) => {
//     console.log(id, topic);
//   });
//
//   async function onDisconnect() {
//     if (!disconnecting) {
//       if (providerClient) {
//         setDisconnecting(true)
//         try {
//           await providerClient.disconnect()
//         } catch (error) {
//           const message = getErrorMessage(error)
//           showErrorToast(message)
//         }
//         setDisconnecting(false)
//         setSession(false)
//       } else {
//         showErrorToast('providerClient is not initialized')
//       }
//     }
//   }
//
//   async function onSignMessage() {
//     if (providerClient?.session) {
//       try {
//         const { request } = DEMO_SIGN_REQUEST(
//           providerClient.session.topic,
//           providerClient.accounts[0]
//         )
//         const result = await providerClient.request(request)
//         NotificationCtrl.open('Sign Message', JSON.stringify(result, null, 2))
//       } catch (error) {
//         const message = getErrorMessage(error)
//         showErrorToast(message)
//       }
//     } else {
//       showErrorToast('providerClient is not initialized')
//     }
//   }
//
//   useEffect(() => {
//     if (providerClient) {
//       providerClient.on('disconnect', () => {
//         setSession(false)
//       })
//     }
//   }, [providerClient])
//
//   useEffect(() => {
//     onInitializeProviderClient()
//   }, [])
//
//   return (
//     <>
//       {providerClient && (
//         <Card css={{ maxWidth: '400px', margin: '100px auto' }} variant="bordered">
//           <Card.Body css={{ justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//             {session ? (
//               <>
//                 <Button shadow color="primary" onPress={onSignMessage}>
//                   Sign Message
//                 </Button>
//                 <Spacer />
//                 <Button shadow color="error" onPress={onDisconnect} disabled={disconnecting}>
//                   {disconnecting ? <Loading size="xs" color={'white'} /> : 'Disconnect'}
//                 </Button>
//               </>
//             ) : (
//               <Button shadow color="primary" onPress={onConnect}>
//                 Connect
//               </Button>
//             )}
//           </Card.Body>
//         </Card>
//       )}
//     </>
//   )
// }
