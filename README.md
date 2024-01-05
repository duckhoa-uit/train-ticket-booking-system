# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)


## Giới thiệu thành viên

- 19520646 Võ Hoàng Đức Khoa
- 20521404 Nguyễn Quốc Huy
- 20521419 Vũ Quang Huy

## Công nghệ sử dụng

1. ReactJs

ReactJS, thường được gọi đơn giản là React, là một thư viện JavaScript phổ biến được dùng để xây dựng giao diện người dùng, đặc biệt là các ứng dụng một trang (single-page applications - SPA). Nó được phát triển bởi Facebook (nay là Meta) và ra mắt vào năm 2013.

a. Lý do nên sử dụng ReactJS

- Component-Based Architecture: React sử dụng cấu trúc dựa trên các thành phần (component), giúp phát triển ứng dụng trở nên linh hoạt và dễ tái sử dụng code.
- Virtual DOM: React tạo ra một DOM ảo (Virtual DOM), cho phép ứng dụng cập nhật hiệu quả và nhanh chóng mà không cần tái tải toàn bộ trang.
- Hỗ trợ Lớn từ Cộng đồng: Với cộng đồng lớn, React có nhiều tài nguyên học tập, thư viện bổ trợ và công cụ phát triển.
Tối ưu cho Hiệu suất: Kỹ thuật so sánh và cập nhật thông minh giúp tăng hiệu suất ứng dụng.
- JSX: JSX là cú pháp mở rộng cho JavaScript, giúp viết code giao diện trở nên dễ dàng và rõ ràng hơn.
- Tích hợp Linh hoạt: React có thể tích hợp với nhiều framework và thư viện khác như Redux, React Router,...

b. Điểm mạnh

- Tối ưu hiệu suất: Nhờ Virtual DOM, React giảm thiểu thời gian cần thiết để cập nhật giao diện người dùng.
- Tái sử dụng Component: Khả năng tái sử dụng component giúp quá trình phát triển nhanh và hiệu quả hơn.
- Cộng đồng lớn và Hhỗ trợ mạnh mẽ: Có rất nhiều tài liệu, hướng dẫn và nguồn lực hỗ trợ từ cộng đồng.
- Cải tiến liên tục: React liên tục được cập nhật và cải tiến, theo kịp với xu hướng công nghệ mới.
- Tương thích ngược: Facebook chú trọng đến việc đảm bảo tương thích ngược cho các phiên bản mới của React.
c. Điểm yếu

- Chỉ là Thư viện, Không phải Framework: React chỉ là một thư viện chuyên về giao diện, không phải là một framework toàn diện; do  đó, cần sự hỗ trợ từ các thư viện khác.
- Học JSX có thể Khó khăn: Việc học JSX có thể gây khó khăn cho những người mới làm quen với React.
- Cập nhật Liên tục: Những cập nhật thường xuyên đôi khi làm cho việc theo kịp với công nghệ trở nên khó khăn.
- Quản lý Trạng thái: Trong các ứng dụng lớn, việc quản lý trạng thái có thể trở nên phức tạp và đòi hỏi các thư viện bổ trợ như Redux.

2. NextJs

Next.js là một framework React cho phép phát triển ứng dụng web React một cách dễ dàng và có hiệu suất cao. Dưới đây là một giới thiệu về Next.js, bao gồm lý do nên sử dụng, điểm mạnh và điểm yếu:

a. Lý do nên sử dụng Next.js

- Server-Side Rendering (SSR) và Static Site Generation (SSG): Next.js hỗ trợ SSR và SSG một cách nhanh chóng và dễ dàng. Điều này giúp cải thiện hiệu suất và tối ưu trải nghiệm người dùng.
- Routing tích hợp: Next.js có hệ thống routing tự động, giúp quản lý các đường dẫn URL một cách dễ dàng và tự nhiên.
- Hot Module Replacement (HMR): HMR giúp người phát triển xem những thay đổi ngay lập tức mà không cần làm mới trình duyệt, tăng tốc độ phát triển.
- Tích hợp dễ dàng với React: Next.js được xây dựng trên nền tảng React, giúp tích hợp với các thành phần React hiện có một cách mượt mà.
- Tích hợp API Routes: Cung cấp API Routes để xây dựng các API một cách dễ dàng và có thể được tích hợp trực tiếp vào ứng dụng Next.js.
- Cộng đồng và Hỗ trợ: Next.js có một cộng đồng lớn và đội ngũ phát triển đằng sau được hỗ trợ chặt chẽ.
b. Điểm mạnh

- Hiệu suất Cao: SSR và SSG giúp giảm thời gian tải trang, cải thiện trải nghiệm người dùng và tối ưu hóa SEO.
- Dễ Dàng Tích Hợp với API: Có thể tích hợp dễ dàng với các API bằng cách sử dụng API Routes, làm cho việc xây dựng và quản lý ứng dụng hoạt động trơn tru và hiệu quả.
- Hỗ Trợ CSS-in-JS: Next.js hỗ trợ nhiều cách quản lý CSS, bao gồm CSS modules, styled-components, và emotion.
- Phát Triển Nhanh chóng: HMR giúp tăng tốc quá trình phát triển bằng cách hiển thị những thay đổi ngay lập tức.
- Tích hợp TypeScript dễ dàng: Hỗ trợ TypeScript nền tảng, giúp kiểm soát kiểu dữ liệu và tăng tính ổn định của ứng dụng.

c. Điểm yếu

- Nhiều kiến thức cần nắm trước khi vận dụng: Có một số khái niệm và tính năng mới (ví dụ: Server-Side Rendering) có thể đòi hỏi thời gian để hiểu rõ, đặc biệt là đối với những người mới bắt đầu.
- Tích hợp cụm cơ sở dữ liệu phức tạp: Khi ứng dụng phức tạp, việc quản lý cơ sở dữ liệu có thể đòi hỏi sự xử lý cẩn thận và kiến thức sâu rộng về Next.js và React.
- Cần hiểu rõ React: Đối với những người mới sử dụng Next.js, việc có kiến thức vững về React là quan trọng để tận dụng đầy đủ tiềm năng của framework.

3. TailwindCSS

Tailwind CSS là một framework CSS utility-first, có ý nghĩa là nó cung cấp một tập hợp các lớp CSS có sẵn để bạn có thể sử dụng trực tiếp trong HTML của mình. Dưới đây là một giới thiệu về Tailwind CSS, bao gồm lý do nên sử dụng, điểm mạnh và điểm yếu:

a. Lý do nên sử dụng Tailwind CSS

- Tốc độ Phát triển Nhanh chóng: Tailwind giúp tăng tốc quá trình phát triển bằng cách giảm thiểu việc viết CSS từ đầu, thay vào đó sử dụng các lớp CSS đã được định nghĩa sẵn.
- Dễ Dàng Tùy chỉnh và Mở Rộng: Mặc dù cung cấp nhiều lớp CSS mặc định, nhưng Tailwind cũng cho phép bạn tùy chỉnh và mở rộng theo ý muốn của bạn thông qua tệp cấu hình.
- Khả năng Tương tác và Hiệu quả cao: Tailwind giúp tối ưu hóa trải nghiệm người dùng bằng cách giảm kích thước file CSS và tối ưu hóa hiệu suất của trang web.
- Không Cần Chọn Lựa Tên Lớp: Bạn không cần phải đặt tên cho lớp CSS của mình, giúp tránh những quyết định khó khăn về tên lớp.
- Cộng Đồng Lớn và Hỗ Trợ Mạnh Mẽ: Tailwind có một cộng đồng rộng lớn, có nhiều tài nguyên hỗ trợ và ví dụ sử dụng.

b. Điểm mạnh

- Tăng tốc phát triển: Việc sử dụng các lớp đã được định nghĩa giảm thời gian viết CSS và tăng tốc độ phát triển.
- Tùy chỉnh linh hoạt: Dù có sẵn các lớp CSS, bạn vẫn có thể tùy chỉnh và mở rộng để phù hợp với thiết kế của bạn.
- Khả năng tích hợp tốt với các framework và thư viện khác: Tailwind dễ tích hợp với các framework JavaScript như React, Vue.js, và Angular.
- Tiếp cận Utility-First: Giúp tăng khả năng tái sử dụng và giảm độ phức tạp của CSS.

c. Điểm yếu

- Dung Lượng Lớn: Khi sử dụng đầy đủ các lớp, dung lượng của tệp CSS có thể trở nên lớn, tuy nhiên, có thể tối ưu hóa bằng cách loại bỏ các phần không cần thiết.
- Khả năng Đọc và Hiểu Code: Một số người có thể thấy khó khăn khi đọc và hiểu code do sự tiếp cận utility-first, đặc biệt là đối với những người mới sử dụng Tailwind.
- Tính Nhất quán Có thể Bị Mất Mát: Do sự linh hoạt và tùy chỉnh, có thể xảy ra tình trạng thiếu nhất quán giữa các phần của dự án.

4. Typescript

a. Giới thiệu về TypeScript

TypeScript là một ngôn ngữ lập trình được phát triển bởi Microsoft, là một siêu tập (superset) của JavaScript. Nó thêm vào các tính năng của JavaScript, đặc biệt là hệ thống kiểu dữ liệu tĩnh (static typing). TypeScript được biên dịch thành JavaScript, có nghĩa là nó có thể chạy trên bất kỳ trình duyệt, máy chủ hoặc môi trường nào khác mà JavaScript có thể chạy.

b. Lý do nên sử dụng TypeScript

- Hệ thống kiểu dữ liệu tĩnh: TypeScript cung cấp kiểm tra kiểu tại thời điểm biên dịch, giúp phát hiện lỗi sớm và giảm thiểu lỗi tại thời điểm runtime.
- Tính tương thích với JavaScript: Mọi mã JavaScript đều là mã TypeScript hợp lệ, điều này làm cho việc chuyển đổi từ JavaScript sang TypeScript trở nên dễ dàng.
- Cải thiện trải nghiệm lập trình: Tính năng tự động hoàn thành mã và gợi ý kiểu dữ liệu giúp cải thiện đáng kể trải nghiệm lập trình.
- Hỗ trợ lập trình hướng đối tượng: TypeScript hỗ trợ các tính năng OOP (Object-Oriented Programming) như classes, interfaces, và inheritance.
- Phù hợp với dự án lớn: TypeScript thường được ưa chuộng trong các dự án lớn và phức tạp, nơi mà quản lý và bảo trì mã nguồn trở nên quan trọng.

c. Điểm mạnh

- Phát hiện lỗi sớm: Hệ thống kiểu giúp phát hiện lỗi trong quá trình biên dịch thay vì tại runtime.
- Tính năng mở rộng và tính tương thích: Mở rộng JavaScript và hoàn toàn tương thích với nó.
- Hỗ trợ IDE tốt: Hỗ trợ tốt từ các môi trường phát triển tích hợp (IDEs), với các tính năng như tự động hoàn thành mã và refactor code.
- Dễ dàng tổ chức mã: Hỗ trợ modules, namespaces, và các tính năng hướng đối tượng giúp tổ chức và quản lý mã dễ dàng hơn.
- Cộng đồng mạnh mẽ: Hưởng lợi từ cộng đồng lớn của JavaScript và sự hỗ trợ mạnh mẽ từ Microsoft.

d. Điểm yếu

- Đường học khó hơn JavaScript: Yêu cầu hiểu biết về hệ thống kiểu dữ liệu và OOP, có thể là một thách thức đối với lập trình viên mới hoặc những người chỉ quen với JavaScript.
- Thời gian Biên Dịch: Có thể mất thêm thời gian biên dịch so với JavaScript thuần.
- Cần Cập Nhật Kiểu Dữ Liệu cho Các Thư viện Bên Ngoài: Một số thư viện JavaScript có thể không có kiểu dữ liệu TypeScript sẵn có, yêu cầu phải tự định nghĩa hoặc tìm kiếm kiểu dữ liệu từ cộng đồng.
- Khả Năng Tương Thích Ngược: Trong một số trường hợp, việc tích hợp TypeScript

5.PostgreSQL

a. Giới thiệu

PostgreSQL, thường được gọi là Postgres, là một hệ thống quản lý cơ sở dữ liệu quan hệ (RDBMS) mã nguồn mở với hơn 30 năm phát triển liên tục. Nó được biết đến với sự ổn định, mạnh mẽ và tính năng phong phú, và nó được thiết kế để xử lý một loạt các tải công việc từ máy tính cá nhân đến data warehouses hoặc dịch vụ web có nhiều người dùng đồng thời.

b. Lý do nên sử dụng

- Mã nguồn mở và cộng đồng mạnh mẽ: PostgreSQL có một cộng đồng lớn các nhà phát triển và chuyên gia, cung cấp một nguồn lực dồi dào cho hỗ trợ và phát triển.
- Tính năng phong phú: PostgreSQL hỗ trợ các tính năng nâng cao như cơ sở dữ liệu không gian địa lý (PostGIS), các giao dịch đồng thời, và kiểu dữ liệu tùy chỉnh, giúp nó trở thành lựa chọn tốt cho một loạt các ứng dụng.
- Tuân thủ ACID: Đảm bảo các giao dịch hoàn thành một cách an toàn và đáng tin cậy, giữ cho dữ liệu chính xác và đồng nhất ngay cả trong điều kiện không mong muốn.
- Khả năng mở rộng: PostgreSQL có thể xử lý lượng dữ liệu lớn và hỗ trợ các giải pháp mở rộng cả theo chiều dọc và chiều ngang.
- Bảo mật: Cung cấp nhiều cấp độ bảo mật, bao gồm xác thực, mã hóa và phân quyền truy cập.

c. Điểm mạnh

- Khả năng mở rộng cao: PostgreSQL hỗ trợ việc mở rộng cả về kích thước cơ sở dữ liệu và khả năng xử lý truy vấn.
- Hỗ trợ SQL đầy đủ và mở rộng: Ngoài việc hỗ trợ tiêu chuẩn SQL, Postgres còn cho phép mở rộng thông qua hàm lưu trữ, trình kích hoạt và các loại dữ liệu tùy chỉnh.
- Chức năng mạnh mẽ: Cung cấp đầy đủ các tính năng của RDBMS, bao gồm giao dịch, subquery, triggers, view và nhiều hơn nữa.
- Hỗ trợ dữ liệu không gian địa lý: PostGIS là một công cụ mạnh mẽ cho việc quản lý dữ liệu không gian địa lý.

d. Điểm yếu

- Hiệu suất trên tải công việc OLTP lớn: Mặc dù PostgreSQL được tối ưu hóa cho độ tin cậy và tính năng, nó có thể không nhanh bằng một số cơ sở dữ liệu khác, đặc biệt là trong các ứng dụng OLTP (Online Transaction Processing) có tải công việc rất lớn.
- Quản lý tài nguyên phức tạp: Việc tinh chỉnh và quản lý tài nguyên cho PostgreSQL có thể phức tạp và đòi hỏi kiến thức chuyên sâu.
- Thị trường: Trong khi PostgreSQL rất phổ biến trong cộng đồng mã nguồn mở, nó có thể không có thị phần lớn như một số RDBMS thương mại khác, có thể ảnh hưởng đến việc tìm kiếm nhân sự có kỹ năng tương ứng.
- Tích hợp và công cụ: Mặc dù có nhiều công cụ và phần mềm hỗ trợ PostgreSQL, chúng có thể không sẵn có hoặc không phong phú bằng các giải pháp thương mại

6. Docker

a. Giới thiệu

Docker là một nền tảng mã nguồn mở cho việc phát triển, vận chuyển và chạy ứng dụng thông qua các container. Docker cho phép bạn đóng gói một ứng dụng cùng tất cả phụ thuộc của nó vào một container độc lập, giúp đảm bảo rằng ứng dụng sẽ chạy mượt mà trong mọi môi trường.

b. Lý do nên sử dụng Docker:

- Độc lập về môi trường: Docker giúp giải quyết vấn đề "nó chạy trên máy của tôi" bằng cách đóng gói ứng dụng và môi trường của nó thành một container có thể chạy mọi nơi.
- Khả năng di động: Containers có thể dễ dàng được chuyển từ máy phát triển đến máy chủ sản phẩm, giữa các môi trường cloud, hoặc giữa các hệ điều hành khác nhau.
- Tái sử dụng và cách ly: Containers cung cấp cách ly giữa các ứng dụng, giúp tối ưu hóa việc sử dụng tài nguyên và cho phép tái sử dụng các thành phần.
- Tối ưu hóa quá trình CI/CD: Docker tích hợp tốt với các công cụ và dịch vụ CI/CD, giúp tự động hóa việc triển khai ứng dụng.

c. Điểm mạnh của Docker:

- Tối ưu hóa tài nguyên: Docker sử dụng tài nguyên hệ thống một cách hiệu quả, cho phép nhiều containers chạy cùng lúc trên cùng một máy chủ.
- Tích hợp và cộng tác: Docker Hub và Docker Store cho phép bạn chia sẻ containers và sử dụng containers do người khác xây dựng.
- Mô hình microservices: Docker phù hợp với kiến trúc microservices do khả năng cách ly và triển khai độc lập của từng dịch vụ.
- Phát triển nhanh: Docker giảm thiểu thời gian từ việc phát triển đến triển khai, giúp các lập trình viên có thêm thời gian để làm việc trên mã nguồn.

d. Điểm yếu của Docker:

- Bảo mật: Containers chia sẻ cùng một kernel của hệ điều hành, có thể dẫn đến các rủi ro bảo mật nếu không được quản lý đúng cách.
- Lưu trữ dữ liệu: Việc quản lý dữ liệu trong và giữa các containers có thể trở nên phức tạp, đặc biệt là khi cần lưu trữ dữ liệu persistent.
- Giao diện người dùng: Docker chủ yếu được quản lý thông qua dòng lệnh, có thể là một rào cản đối với những người mới bắt đầu.
- Hiệu suất I/O: Containers có thể gặp phải hiệu suất I/O không tốt bằng so với máy chủ vật lý hoặc máy ảo truyền thống, tùy thuộc vào tải công việc và cấu hình.

7. Prisma

a. Giới thiệu Prisma: 

Prisma là một ORM (Object-Relational Mapping) tiên tiến cho TypeScript và JavaScript. Nó giúp các nhà phát triển dễ dàng truy vấn cơ sở dữ liệu bằng cách sử dụng cú pháp trực quan và mạnh mẽ. Prisma hoạt động như một lớp trừu tượng giữa cơ sở dữ liệu và mã ứng dụng, cung cấp khả năng tự động tạo ra các truy vấn cơ sở dữ liệu tối ưu từ code.

b. Lý do nên sử dụng Prisma:

- Cấu trúc dự án rõ ràng: Prisma cung cấp cú pháp khai báo định nghĩa mô hình cơ sở dữ liệu, giúp quản lý cấu trúc cơ sở dữ liệu trở nên rõ ràng và dễ dàng.
- Tích hợp dễ dàng: Prisma có thể tích hợp một cách mượt mà với các frameworks JavaScript/TypeScript hiện đại như Node.js, - - - NestJS, Next.js và nhiều hơn nữa.
- Hiệu suất cao: Prisma được thiết kế để tối ưu hóa hiệu suất truy vấn và giảm thiểu truy vấn không cần thiết.
- Hỗ trợ Type-safe: Với TypeScript làm ngôn ngữ nền tảng, Prisma cung cấp kiểm tra kiểu dữ liệu an toàn tại thời điểm biên dịch.
- Tự động hoá migrations: Prisma Migrate giúp tự động hoá việc tạo và quản lý migrations cho cơ sở dữ liệu.

c. Điểm mạnh của Prisma:

- Type-Safety: Prisma cung cấp kiểm tra kiểu dữ liệu toàn diện, giúp phát hiện lỗi sớm trong quá trình phát triển.
- Mạnh mẽ và linh hoạt: Prisma hỗ trợ một loạt các truy vấn phức tạp, từ CRUD đến các hoạt động cơ sở dữ liệu nâng cao.
- Công cụ hỗ trợ: Prisma Studio là một công cụ GUI cho phép bạn trực tiếp làm việc với cơ sở dữ liệu mà không cần truy vấn SQL.
- Cộng đồng và tài liệu: Prisma có một cộng đồng năng động và bộ tài liệu đầy đủ, giúp nhà phát triển dễ dàng học hỏi và áp dụng.

d. Điểm yếu của Prisma:

- Tùy chỉnh hạn chế: Một số nhà phát triển có thể thấy Prisma cung cấp ít sự linh hoạt hơn so với các ORM truyền thống khi cần tùy chỉnh sâu các truy vấn.
- Không phải là SQL truyền thống: Đối với những người đã quen với SQL thuần, việc chuyển sang sử dụng Prisma có thể đòi hỏi một quá trình học tập.
- Hỗ trợ cơ sở dữ liệu: Tuy Prisma hỗ trợ nhiều cơ sở dữ liệu, nhưng có thể không hỗ trợ một số cơ sở dữ liệu ít phổ biến hoặc các tính năng đặc thù của một số cơ sở dữ liệu cụ thể.
- Migrations: Prisma Migrate còn khá mới và đang tiếp tục phát triển, có thể chưa hỗ trợ tất cả các tính năng migrations mà một số dự án cần.

8. Kickbox

Kickbox là một dịch vụ kiểm tra và xác thực địa chỉ email trực tuyến. Nó cung cấp API để kiểm tra tính hợp lệ của địa chỉ email và xác minh tính tồn tại của chúng trong thời gian thực.

a. Tại sao nên sử dụng Kickbox: 

- Việc sử dụng Kickbox có thể hữu ích trong việc duy trì danh sách địa chỉ email chất lượng và giúp tăng cường hiệu suất của chiến dịch marketing qua email, đảm bảo rằng thông tin được gửi đi đến đúng và có tính khả thi.

b. Điểm mạnh:

- Kiểm tra độ hợp lệ: Kickbox có khả năng xác định xem một địa chỉ email có đúng định dạng hay không, giúp ngăn chặn việc nhập sai hoặc tồn tại các email không hợp lệ.

- Xác thực tồn tại: Dịch vụ này có thể kiểm tra xem địa chỉ email đó có thực sự tồn tại trên máy chủ email hay không, giúp tránh việc gửi email tới địa chỉ không hoạt động.

- API dễ sử dụng: Cung cấp API linh hoạt và dễ tích hợp vào các ứng dụng và trang web.

c. Điểm yếu:

- Giới hạn miễn phí: Dịch vụ miễn phí của Kickbox có thể giới hạn về số lần kiểm tra hoặc chức năng so với các gói trả phí.

- Phụ thuộc vào hệ thống bên ngoài: Tính năng và độ tin cậy của dịch vụ có thể phụ thuộc vào việc kết nối với các hệ thống email khác, do đó có thể bị ảnh hưởng nếu có sự cố từ phía hệ thống này.


## Tính năng

- Quản lý tàu hỏa

- Quản lý toa tàu

- Quản lý ghế 

- Quản lý loại ghế

- Quản lý trạm

- Quản lý mã giảm giá

- Quản lý tuyến đường

- Đặt vé

## Cách chạy project

Bước 1: pnpm i

Bước 2: cd packages/prisma

Bước 3: pnpm generate-schemas

Bước 4: pnpm dev:api (Back-end)

Bước 5: pnpm dev (Front-end)

* Database: pnpm db-studio




