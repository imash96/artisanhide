import { StoreCreateMeasurementDTO, StoreMeasurementResponse, StoreUpdateMeasurementDTO } from '@/types/measurement';
import type { Client, ClientHeaders } from '@medusajs/js-sdk';

export class StoreMeasurementResource {
    constructor(private client: Client) { }

    async list(headers?: ClientHeaders) {
        return this.client.fetch<StoreMeasurementResponse[]>(`/store/customers/measurements`, {
            method: 'GET',
            headers
        });
    }

    async create(data: StoreCreateMeasurementDTO, headers?: ClientHeaders) {
        return this.client.fetch<StoreMeasurementResponse>(`/store/customers/measurements`, {
            method: 'PUT',
            body: data,
            headers
        });
    }

    async retrive(measurementId: string, headers?: ClientHeaders) {
        return this.client.fetch<StoreMeasurementResponse>(`/store/customers/measurements/${measurementId}`, {
            method: 'GET',
            headers
        });
    }

    async update(measurementId: string, data: StoreUpdateMeasurementDTO, headers?: ClientHeaders) {
        return this.client.fetch<StoreMeasurementResponse>(`/store/customers/measurements/${measurementId}`, {
            method: 'POST',
            body: data,
            headers
        });
    }

    async delete(measurementId: string, headers?: ClientHeaders) {
        return this.client.fetch<StoreMeasurementResponse>(`/store/customers/measurements/${measurementId}`, {
            method: 'DELETE',
            headers
        });
    }
}