export class EventMockService {

    subscribe(topic: string, observer: any) {
        return true;
    }

    publish(topic: string, data?: any) {
        return true;
    }

    destroy(topic: string) {
        return true;
    }

}