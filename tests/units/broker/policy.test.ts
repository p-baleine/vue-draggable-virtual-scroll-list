import { generateItems } from '../../utils';

import Policy from '../../../src/broker/policy';

describe('Broker', () => {
  describe('Policy', () => {
    describe('.prototype.findRealItem()', () => {
      it('引数のitemを元にdataSourcesから本物のitemを探して返却すること', () => {
        const items = generateItems()
        const visibleRange = { start: 15 };
        const policy = new Policy('id', (items as any), visibleRange);
        const item = items[10];
        const idx = items.findIndex(x => x.id === item.id)
        expect(policy.findRealItem(item))
          .toEqual(items[idx + visibleRange.start]);
      });
    });
  });
});
