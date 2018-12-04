import { MonitoreoModule } from './monitoreo.module';

describe('MonitoreoModule', () => {
  let monitoreoModule: MonitoreoModule;

  beforeEach(() => {
    monitoreoModule = new MonitoreoModule();
  });

  it('should create an instance', () => {
    expect(monitoreoModule).toBeTruthy();
  });
});
