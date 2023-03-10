import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RmqService } from "./rmq.service";

interface RmqModuleOptions {
    name: string
    queue: string
}

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule{
    static register(rmqModuleOptions: RmqModuleOptions): DynamicModule{
        const { name, queue } = rmqModuleOptions
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>('RABBIT_MQ_URI')],
                                queue: configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                            }
                        }),
                        inject: [ConfigService]
                    }
                ])
            ],
            exports: [ClientsModule]
        }
    }
}