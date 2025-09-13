import type { Client } from '@medusajs/js-sdk';
import { Store } from '@medusajs/js-sdk';
import Medusa, { type Config } from '@medusajs/js-sdk';
import { StoreMeasurementResource } from './store-measurement';

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

export class MedusaPluginsSDK extends Medusa {
  public store: ExtendedStoreSDK

  constructor(config: Config) {
    super(config)

    this.store = new ExtendedStoreSDK(this.client)
  }
}

class ExtendedStoreSDK extends Store {
  public measurement: StoreMeasurementResource;

  constructor(client: Client) {
    super(client);
    this.measurement = new StoreMeasurementResource(client);
  }
}

export const sdk = new MedusaPluginsSDK({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: false,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})