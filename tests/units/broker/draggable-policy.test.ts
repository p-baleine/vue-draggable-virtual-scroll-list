import { generateItems } from '../../utils';

import DraggablePolicy from '../../../src/broker/draggable-policy';

describe('Broker', () => {
  describe('DraggablePolicy', () => {
    describe('.prototype.findRealItem()', () => {
      it('引数のitemを元にdataSourcesから本物のitemを探して返却すること', () => {
        const items = generateItems()
        const visibleRange = { start: 15 };
        const draggablePolicy = new DraggablePolicy(
          'id', (items as any), visibleRange);
        const item = items[10];
        const idx = items.findIndex(x => x.id === item.id)
        expect(draggablePolicy.findRealItem(item))
          .toEqual(items[idx + visibleRange.start]);
      });
    });
  });
});
