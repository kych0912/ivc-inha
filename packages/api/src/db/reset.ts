import { db } from './drizzle';
import * as schema from './schema';
import { sql } from 'drizzle-orm';

async function resetDatabase() {
  console.log('🗑️ 데이터베이스 테이블 삭제 중');

  Object.values(schema).forEach(async (table) => {
    await db.execute(sql`DROP TABLE IF EXISTS ${table}`);
  });

  console.log('✅ 데이터베이스 테이블 삭제 완료');
  process.exit(0);
}

resetDatabase().catch((error) => {
  console.error('❌ 데이터베이스 테이블 삭제 오류:', error);
  process.exit(1);
});
