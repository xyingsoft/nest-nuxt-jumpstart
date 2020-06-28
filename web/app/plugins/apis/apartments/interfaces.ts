import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CreateApartmentDto } from './dto'

export interface ApartmentApiInterface {
  $axios: NuxtAxiosInstance

  all(): Promise<any>
  get(id: string): Promise<any>
  create(params: CreateApartmentDto): void
  destroy(id: string): Promise<any>
}
