import { fakeAsync, TestBed, tick } from "@angular/core/testing";

import { NotificationService } from "./notification-service";
import { NOTIFICATION_DURATION } from "./notification.config";

describe("NotificationService", () => {
  let service: NotificationService;
  const duration = 5000;

  const testAddNotification = (message: string, duration: number): void => {
    expect(service.notifications().length).toBe(1);
    expect(service.notifications()[0].message).toBe(message);

    tick(duration - 1);
    expect(service.notifications().length).toBe(1);

    tick(1);
    expect(service.notifications().length).toBe(0);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NOTIFICATION_DURATION,
          useValue: duration,
        },
      ],
    });
    service = TestBed.inject(NotificationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should notify a success", fakeAsync(() => {
    const message = "success";

    service.success(message);

    testAddNotification(message, duration);
  }));

  it("should notify an error", fakeAsync(() => {
    const message = "error";

    service.error(message);

    testAddNotification(message, duration);
  }));

  it("should remove a notification if it exists", () => {
    service.success("success");
    const id = service.notifications()[0].id;

    service.remove(id);

    expect(service.notifications().length).toBe(0);
  });

  it("should not remove any notification if id does not exist", () => {
    service.success("success");

    service.remove("123");

    expect(service.notifications().length).toBe(1);
  });
});
