


// callback是onlyOne而且需要上下文，emit可以是多个listener，而且上下文不是必须的。
// 还有一种简单分法就是只有你自己关心的就是callback，大多数情况都是这样；
// 需要别人关心，或者说开放给比人的地方就用emit比较好，比如写模块的时候经常这么用。