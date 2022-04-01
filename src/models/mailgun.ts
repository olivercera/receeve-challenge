export interface MailgunEvent {
    signature: Signature;
    "event-data": EventData;
}

export interface EventData {
    id: string;
    timestamp: number;
    "log-level": string;
    event: string;
    "delivery-status": DeliveryStatus;
    flags: Flags;
    envelope: Envelope;
    message: Message;
    recipient: string;
    "recipient-domain": string;
    storage: Storage;
    campaigns: any[];
    tags: string[];
    "user-variables": UserVariables;
}

export interface DeliveryStatus {
    tls: boolean;
    "mx-host": string;
    code: number;
    description: string;
    "session-seconds": number;
    utf8: boolean;
    "attempt-no": number;
    message: string;
    "certificate-verified": boolean;
}

export interface Envelope {
    transport: string;
    sender: string;
    "sending-ip": string;
    targets: string;
}

export interface Flags {
    "is-routed": boolean;
    "is-authenticated": boolean;
    "is-system-test": boolean;
    "is-test-mode": boolean;
}

export interface Message {
    headers: string[];
    attachments: any[];
    size: number;
}

export interface Storage {
    url: string;
    key: string;
}

export interface UserVariables {
    my_var_1: string;
    "my-var-2": string;
}

export interface Signature {
    token: string;
    timestamp: string;
    signature: string;
}
