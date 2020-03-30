export interface DealerApplicationConfigurationModel {
    DealerId: string
    Application: string
    DeviceId: string
    DealerApplicationConfigurationKey: number
    DeviceDescription: string
    ExpiredDate?: Date
    IsAllowAccess: boolean
    ExpiredDateString: string
}
